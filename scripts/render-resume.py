"""Render curated portfolio data as a compact, linked English resume."""
import json
import sys
from html import escape
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, KeepTogether

data = json.load(open(sys.argv[1], encoding="utf-8"))
ink = colors.HexColor("#182633")
blue = colors.HexColor("#235570")
styles = {
    "name": ParagraphStyle("name", fontName="Helvetica-Bold", fontSize=25, leading=28, textColor=ink, spaceAfter=5),
    "contact": ParagraphStyle("contact", fontName="Helvetica", fontSize=9, leading=12, textColor=blue, spaceAfter=9),
    "body": ParagraphStyle("body", fontName="Helvetica", fontSize=9.5, leading=12.2, textColor=ink, spaceAfter=3),
    "section": ParagraphStyle("section", fontName="Helvetica-Bold", fontSize=10, leading=13, textColor=blue, spaceBefore=7, spaceAfter=4, keepWithNext=True),
    "title": ParagraphStyle("title", fontName="Helvetica-Bold", fontSize=9.5, leading=12, textColor=ink, spaceAfter=2, keepWithNext=True),
    "period": ParagraphStyle("period", fontName="Helvetica", fontSize=8.5, leading=11, textColor=colors.HexColor("#536575"), spaceAfter=3, keepWithNext=True),
    "bullet": ParagraphStyle("bullet", fontName="Helvetica", fontSize=9.5, leading=12.2, textColor=ink, leftIndent=9, firstLineIndent=-7, spaceAfter=3),
}
def p(text, style="body"):
    text = text.replace("\u2013", "-").replace("\u2014", "-").replace("\u00b7", "|")
    return Paragraph(escape(text), styles[style])
def link(url, label):
    return f'<link href="{escape(url, quote=True)}" color="#235570">{escape(label)}</link>'

story = [p(data["name"], "name")]
story.append(Paragraph(" | ".join([
    link(data["url"], "Portfolio"), link(data["github"], "GitHub"),
    link("mailto:" + data["email"], data["email"]),
]), styles["contact"]))
story.append(p(data["focus"]))
story.append(p("EDUCATION", "section"))
edu = data["education"]
story.append(p(f'{edu["school"]} | Class of {edu["expectedGraduation"]}', "title"))
story.append(p(f'{edu["gradeLevel"]} | GPA {edu["gpa"]} ({edu["gpaType"]}) | Intended field: Artificial Intelligence'))
for key, heading in [("experience", "EXPERIENCE & CLUB LEADERSHIP"), ("projects", "SELECTED PROJECTS")]:
    story.append(p(heading, "section"))
    for item in data[key]:
        group = [Paragraph(link(data["url"] + item["href"], item["title"]), styles["title"])]
        if item.get("period"):
            group.append(p(item["period"], "period"))
        group.extend(p("- " + text, "bullet") for text in item["bullets"])
        group.append(Spacer(1, 2))
        story.append(KeepTogether(group))
for key, heading in [("leadership", "ADDITIONAL LEADERSHIP"), ("honors", "SELECTED HONORS")]:
    story.append(p(heading, "section"))
    story.extend(p(text) for text in data[key])
story.append(p("TECHNICAL SKILLS", "section"))
story.append(p(data["skills"]))
doc = SimpleDocTemplate(sys.argv[2], pagesize=A4, rightMargin=39, leftMargin=39,
                        topMargin=32, bottomMargin=30, title="Minchan Kim - Resume", author=data["name"])
doc.build(story)
print("Generated resume PDF")
