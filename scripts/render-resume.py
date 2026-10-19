"""Render the portfolio's published config data as a two-page resume."""
import json
import sys
from html import escape

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.platypus import SimpleDocTemplate, Paragraph, PageBreak, KeepTogether

data = json.load(open(sys.argv[1], encoding="utf-8"))
styles = getSampleStyleSheet()
ink = colors.HexColor("#17324d")
styles.add(ParagraphStyle(name="Name", fontName="Helvetica-Bold", fontSize=23, leading=27, textColor=ink))
styles.add(ParagraphStyle(name="Contact", fontSize=8, leading=11, spaceAfter=12))
styles.add(ParagraphStyle(name="Section", fontName="Helvetica-Bold", fontSize=10, leading=14, textColor=ink, spaceBefore=10, spaceAfter=6))
styles.add(ParagraphStyle(name="Role", fontName="Helvetica-Bold", fontSize=9.5, leading=12, spaceBefore=5, spaceAfter=2))
styles.add(ParagraphStyle(name="Meta", fontSize=8.3, leading=11, textColor=colors.HexColor("#505b66"), spaceAfter=3))
styles.add(ParagraphStyle(name="Detail", fontSize=9, leading=12, spaceAfter=4))

def clean(value):
    for old, new in {"\u2014": " - ", "\u2013": "-", "\u2011": "-", "\u2019": "'", "\u2018": "'", "\u201c": '"', "\u201d": '"', "\u2022": "-"}.items():
        value = value.replace(old, new)
    return escape(value)

def p(value, style="Detail"):
    return Paragraph(clean(value), styles[style])

def month(value):
    if value in ("Present", "Completed"): return value
    from datetime import datetime
    return datetime.fromisoformat(value.replace("Z", "+00:00")).strftime("%b %Y")

def section(title):
    return p(title.upper(), "Section")

def footer(canvas, doc):
    canvas.saveState()
    canvas.setStrokeColor(colors.HexColor("#d9e0e7"))
    canvas.line(42, 35, A4[0] - 42, 35)
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(ink)
    canvas.drawString(42, 23, data["siteConfig"]["authorName"])
    canvas.drawRightString(A4[0] - 42, 23, f"{doc.page} / 2")
    canvas.restoreState()

site = data["siteConfig"]
academics = data["academicStats"]
story = [p(site["authorName"], "Name")]
story.append(p(f'{data["email"]} | {site["url"].removeprefix("https://")}\n'
               f' | github.com/{site["username"]}', "Contact"))
story.append(p(site["links"]["linkedin"].removeprefix("https://www."), "Meta"))
story.append(section("Education"))
story.append(p(academics["school"], "Role"))
story.append(p(f'{academics["gradeLevel"]} | Expected {academics["expectedGraduation"]} | GPA: {academics["gpa"]} ({academics["gpaType"]})'))
story.append(p(f'Major focus: {academics["major"]}'))
story.append(section("Engineering & Experience"))

by_id = {item["id"]: item for item in data["experiences"]}
for ident in ["cosmos", "tern", "daemun-iii", "mechanics-club", "kau-aerospace-camp", "shandong-university"]:
    item = by_id[ident]
    paragraphs = [p(f'{item["position"]} | {item["company"]}', "Role"),
                  p(f'{month(item["startDate"])} - {month(item["endDate"])} | {item["location"]}', "Meta"),
                  p(item["description"][0])]
    if ident in ["cosmos", "tern", "daemun-iii", "mechanics-club", "shandong-university"]:
        paragraphs.append(p(item["description"][1]))
    if ident == "kau-aerospace-camp":
        paragraphs.append(p(item["achievements"][0]))
    story.append(KeepTogether(paragraphs))

story.append(section("Technical Skills"))
skills = list(dict.fromkeys(
    [skill for item in data["experiences"] for skill in item["skills"]]
    + [skill for item in data["Projects"] for skill in item["techStack"]]
))
story.append(p(", ".join(skills)))
story.extend([PageBreak(), section("Research & Selected Projects")])
projects = {item["id"]: item for item in data["Projects"]}
for ident in ["wind-tunnel-rc-aircraft", "ciws-drone-tracking-turret", "cosmos-aeroview-windtunnel"]:
    item = projects[ident]
    story.append(KeepTogether([p(item["companyName"], "Role"), p(item["shortDescription"])]))

story.append(section("Honors & Certifications"))
for item in data["honors"]:
    if item["type"] == "Leadership": continue  # Listed under community below.
    story.append(p(f'{item["title"]} | {item["issuer"]} | {item["date"]}'))

story.append(section("Community & Leadership"))
for item in data["communityInvolvement"]:
    # One published description per activity keeps the resume concise.
    story.append(KeepTogether([
        p(f'{item["name"]} | {item["role"]}', "Role"),
        p(item["period"], "Meta"), p(item["description"][0]),
    ]))

doc = SimpleDocTemplate(sys.argv[2], pagesize=A4, leftMargin=42, rightMargin=42,
                        topMargin=35, bottomMargin=45, title=f'{site["authorName"]} - Resume',
                        author=site["authorName"])
doc.build(story, onFirstPage=footer, onLaterPages=footer)
print("Generated public/resume.pdf from config data")
