"use client";
import { cn } from "@/lib/utils";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon,
} from "react-share";
export default function Shared({
  title,
  url,
  orientation = "horizontal",
}: {
  title: string;
  url: string;
  orientation?: "vertical" | "horizontal";
}) {
  return (
    <div
      className={cn(
        orientation === "horizontal"
          ? "flex w-full items-center justify-start gap-3"
          : "flex w-full flex-col items-center justify-start gap-3",
      )}
    >
      <FacebookShareButton
        url={url}
        className="Demo__some-network__share-button"
        name="Shared Facebook"
      >
        <FacebookIcon size={32} className="rounded-md" />
      </FacebookShareButton>
      <FacebookMessengerShareButton
        url={url}
        appId="521270401588372"
        name="Shared Messenger"
      >
        <FacebookMessengerIcon size={32} className="rounded-md" />
      </FacebookMessengerShareButton>
      <TwitterShareButton url={url} title={title} name="Shared Twitter X">
        <XIcon size={32} className="rounded-md" />
      </TwitterShareButton>
      <WhatsappShareButton
        url={url}
        title={title}
        separator=":: "
        name="Shared Whatsapp"
      >
        <WhatsappIcon size={32} className="rounded-md" />
      </WhatsappShareButton>
      <LinkedinShareButton url={url} name="Shared Linkedin">
        <LinkedinIcon size={32} className="rounded-md" />
      </LinkedinShareButton>
      <EmailShareButton
        url={url}
        subject={title}
        body="body"
        name="Shared E-mail"
      >
        <EmailIcon size={32} className="rounded-md" />
      </EmailShareButton>
    </div>
  );
}
