import Form from "../components/Form";
import Overlay from "../components/Overlay";
import randomQuote from '../utils/randomQuote';
import { GetStaticPropsResult } from "next";
import { quoteProps } from "../types/quoteProps";

type HomeProps = {
  quote: string;
}

export default function Home(props : HomeProps) {
  return (
    <main>
        <Form quote={props.quote} />
        <Overlay /> 
    </main>
  )
}


export async function getStaticProps(context : any) : Promise<GetStaticPropsResult<HomeProps>> {

  const quote = randomQuote(); 

  return {
    props: {
      quote: quote
    },
  }
}