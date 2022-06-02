import Header from "../components/Header.js";
import { client, urlFor } from "../sanity";
import Link from "next/link"

export default function Home({posts}) {
  return (
    <div className="max-w-7xl mx-auto">
      <Header/>
      <div className="bg-yellow p-4 flex justify-between items-center h-[26rem]">
        <div className="my-4 space-y-5">
          <h1 className="text-6xl font-medium">Stay Curious</h1>
          <p className="text-lg font-medium max-w-[100%]">Discover stories, thinking, and expertise from writers on any topic</p>
          <h3 className="bg-black text-white py-2 px-4 w-fit rounded-full cursor-pointer">Start reading</h3>
        </div>
        <img className="hidden md:inline-flex h-32 lg:h-full" src="https://accountabilitylab.org/wp-content/uploads/2020/03/Medium-logo.png" alt="" />
      </div>

      {/* Posts  */}
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 md:p-6 lg:gap">
        
        {posts.map((post) => (
          <Link key={post._id} href={`/post/${post.slug.current}`}>
            <div className="border rounded-lg cursor-pointer hover:scale-105 transition-transform duration-200">
              <img className="w-full h-60 object-cover" src={urlFor(post.mainImage).url()} alt="" />
              <div className="flex justify-between p-5">
                <div className="basis-4/5">
                  <p>{post.title}</p>
                  <p>{post.description} by {post.author.name}</p>
                </div>
                <img className="w-12 h-12 rounded-full" src={urlFor(post.author.image).url()} alt="" />
              </div>
            </div>
          </Link>
        ))}
      </div>
      
    </div>
  )
}

export const getServerSideProps = async () => {
  let query = `*[_type == "post"]{
    _id,
    title,
    mainImage,
    author->{
      name,
      image
    },
    description,
    slug,
  }`

  const posts = await client.fetch(query)
  return {
    props:{
      posts,
    }
  }
}