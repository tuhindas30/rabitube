import { useRef } from "react";
import { useShortenUrl } from "react-shorten-url";
import showToast from "../../utils/showToast";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

const ShareForm = () => {
  const url = window.location.href;
  const shortenLink = useRef(null);
  const { loading, error, data } = useShortenUrl(url);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(shortenLink.current.innerText);
    showToast("Link copied to clipboard");
  };

  if (loading) {
    return (
      <div style={{ overflow: "none", border: "1px solid black" }}>
        Generating shareable link ...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ overflow: "none", border: "1px solid black" }}>
        Something went wrong!
      </div>
    );
  }
  return (
    <>
      <div style={{ padding: "1rem 0" }}>
        <EmailShareButton url={data?.link} style={{ margin: "0.5rem" }}>
          <EmailIcon size={50} round={true} />
        </EmailShareButton>
        <LinkedinShareButton url={data?.link} style={{ margin: "0.5rem" }}>
          <LinkedinIcon size={50} round={true} />
        </LinkedinShareButton>
        <TwitterShareButton url={data?.link} style={{ margin: "0.5rem" }}>
          <TwitterIcon size={50} round={true} />
        </TwitterShareButton>
        <FacebookShareButton url={data?.link} style={{ margin: "0.5rem" }}>
          <FacebookIcon size={50} round={true} />
        </FacebookShareButton>
        <TelegramShareButton url={data?.link} style={{ margin: "0.5rem" }}>
          <TelegramIcon size={50} round={true} />
        </TelegramShareButton>
        <WhatsappShareButton url={data?.link} style={{ margin: "0.5rem" }}>
          <WhatsappIcon size={50} round={true} />
        </WhatsappShareButton>
      </div>
      <div
        ref={shortenLink}
        style={{
          border: "1px solid black",
          padding: "0.5rem 0",
        }}>
        {data?.link}
      </div>
      <button
        onClick={handleCopyToClipboard}
        className="btn primary"
        style={{ padding: "0.2rem 0.7rem" }}>
        Copy
      </button>
    </>
  );
};

export default ShareForm;
