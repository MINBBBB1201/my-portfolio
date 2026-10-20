import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ChatMessage({ content }: { content: string }) {
  return (
    <div className="min-w-0 space-y-2 break-words [overflow-wrap:anywhere] [&_p]:my-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:my-1 [&_pre]:overflow-x-auto [&_code]:rounded [&_code]:bg-background/60 [&_code]:px-1">
      <Markdown
        remarkPlugins={[remarkGfm]}
        skipHtml
        disallowedElements={["img"]}
        components={{
          a: ({ href, children }) => <a href={href} target="_blank" rel="noreferrer" className="font-medium text-primary underline underline-offset-2">{children}</a>,
          table: ({ children }) => <div className="max-w-full overflow-x-auto"><table className="border-collapse text-left text-xs">{children}</table></div>,
          th: ({ children }) => <th className="border border-border p-2">{children}</th>,
          td: ({ children }) => <td className="border border-border p-2 align-top">{children}</td>,
        }}
      >{content}</Markdown>
    </div>
  );
}
