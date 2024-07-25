import Image from "next/image";
import { Inter } from "next/font/google";
import * as contentful from 'contentful'

var client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
})

const inter = Inter({ subsets: ["latin"] });

export default function Home(props) {
  return (
    <main className={`flex min-h-screen flex-col items-center p-24 ${inter.className}`} >
      <div>
        <h1 className="text-5xl my-12">{props.title}</h1>
        <p className="text-2xl my-12">{props.description}</p>
        <a href={props.url}>Our url goes heres</a>
      </div>
    </main>
  );
}

export async function getStaticProps() {
  const result = await client.getEntry(process.env.ENTRY_ID)
  return {
    props: {
      title: result.fields.title || "",
      description: result.fields.description || "",
      url: result.fields.url || "",
    }
  }
}