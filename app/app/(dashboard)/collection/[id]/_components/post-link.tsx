import BlogCard from "@/components/global/blog-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Columnist, Post } from "@prisma/client";

export function PostLink({ posts }: { posts: any }) {
  return (
    <Carousel
      opts={{
        align: "center",
      }}
      className="w-full max-w-xs md:max-w-full"
    >
      <CarouselContent>
        {posts.map(
          (post: Post & { tags: any; columnist: Columnist }, index: number) => (
            <CarouselItem
              className="py-6 md:basis-1/2 lg:basis-1/4"
              key={`key-${post.id}-${index}`}
            >
              <BlogCard data={post} />
            </CarouselItem>
          ),
        )}
      </CarouselContent>
      <CarouselPrevious className="hidden lg:block lg:pl-1" />
      <CarouselNext className="hidden lg:block lg:pl-2" />
    </Carousel>
  );
}
