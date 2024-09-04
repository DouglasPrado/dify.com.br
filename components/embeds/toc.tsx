import React from "react";

interface TOCProps {
  toc: { depth: number; text: string; id: string }[];
}

const TOC: React.FC<TOCProps> = ({ toc }) => {
  const renderList = (tocItems: any, depth: number = 2) => {
    const items = JSON.parse(tocItems);
    return (
      <ul
        itemScope={true}
        itemType="https://schema.org/ItemList"
        className="text-xs font-light text-gray-700 "
      >
        {items
          .filter((item: any) => item.depth === depth)
          .map((item: any, idx: number) => (
            <li
              key={item.id}
              className="border-b py-2 md:pb-2 "
              itemProp="itemListElement"
              itemScope={true}
              itemType="http://schema.org/ListItem"
            >
              <a
                className="hover:underline"
                itemProp="url"
                href={`#${item.id}`}
              >
                {item.text}
              </a>
              <meta itemProp="position" content={String(idx + 1)} />
              <meta itemProp="name" content={item.text} />
              {/* {renderList(tocItems, depth + 1)} */}
            </li>
          ))}
      </ul>
    );
  };

  return (
    <nav className="my-3 w-full rounded-lg bg-stone-50 p-6">
      <h3 className="font-cal text-gray-800">
        O que você vai ver nesse conteúdo!
      </h3>
      {renderList(toc)}
    </nav>
  );
};

export default TOC;
