import { useEffect, useState } from "react";
import axios from "axios";

export default function QuoteBox() {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    axios.get("https://zenquotes.io/api/random").then((res) => {
      setQuote(res.data[0].q + " — " + res.data[0].a);
    });
  }, []);

  return <blockquote>{quote}</blockquote>;
}
