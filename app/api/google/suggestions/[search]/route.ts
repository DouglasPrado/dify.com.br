import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: { search: string } },
) {
  return fetch(
    `https://suggestqueries.google.com/complete/search?client=firefox&hl=pt&q=${params.search}`,
    {
      headers: { "Content-Type": "text/plain;charset=iso-8859-1" },
    },
  )
    .then((res) => res.arrayBuffer())
    .then((suggestions) => {
      let decoder = new TextDecoder("iso-8859-1");
      let transformSuggeston = JSON.parse(decoder.decode(suggestions));

      return NextResponse.json({
        suggestions: transformSuggeston[1],
      });
    });
}
