import { client, urlFor } from "../../sanity";
import Header from "../../components/Header";
import PortableText from "react-portable-text";
import { set, useForm } from "react-hook-form";
import { useState } from "react";
import Image from "next/image";

function Post({ post }) {
  const { register, handleSubmit, formState } = useForm();
  const [submitted, setSubmitted] = useState(false)

	const onSubmit = async(data) => {
		await fetch('/api/createComment', {
			method:"POST",
			body: JSON.stringify(data)
		}).then(
      setSubmitted(true)
    ).catch((err)=>{
      console.log(err)
      setSubmitted(false)
    })
	}

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto p-5">
        <div className="flex space-x-4">
          <div className="space-y-1">
            <Image
              width={48}
              height={48}
              layout="fixed"
              className="rounded-full"
              alt="author"
              src={urlFor(post.author.image).url()}
            />
            <h2>{post.author.name}</h2>
          </div>
          <p className="flex-1">{post.author.bioo}</p>
        </div>

        <h1 className="mt-5 text-3xl font-bold">{post.title}</h1>
        <Image
          width='100%'
          height='65%'
          layout="responsive"
          src={urlFor(post.mainImage).url()}
          alt="mainImage"
          className="md:px-10"
          objectFit="contain"
        />

        <PortableText
          dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
          projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
          content={post.body}
          serializers={{
            h1: (props) => (
              <h1 className="text-2xl font-bold my-5" {...props} />
            ),
            h2: (props) => <h1 className="text-xl font-bold my-5" {...props} />,
            li: ({ children }) => (
              <li className="ml-4 list-disc">{children} </li>
            ),
            link: ({ href, children }) => (
              <a href={href} className="text-blue-500 hover:underline">
                {children}
              </a>
            ),
            blockquote: ({ children }) => (
              <blockquote className="shadow-[-3px_0_0_0_rgb(41,41,41)] pl-3 mt-3 italic">
                {children[0]}
              </blockquote>
            ),
          }}
        />
        <hr className="my-5 max-w-xl mx-auto border-t-[1px] border-yellow" />
        {submitted ? (
          <div className="bg-yellow w-fit p-2 text-white mx-auto">
            <h3 className="text-2xl font-bold">Thank You for Commenting</h3>
            <p className="text-sm">Once it has been approved it will appear below</p>
          </div>
        ):(
          <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto">
            <input
              {...register("_id")}
              type="hidden"
              name="_id"
              value={post._id}
            />
            <h3 className="font-bold text-2xl pb-3">Leave a comment below!</h3>
            <label className="block mb-3">
              <span>Name</span>
              <input
                {...register("name", {required:true})}
                className="outline-none border w-full py-2 px-3 rounded"
                placeholder="Krish Chordiya"
                type="text"
              ></input>
            </label>
            <label className="block mb-3">
              <span>Email</span>
              <input
                {...register("email", { required: true })}
                className="outline-none border w-full py-2 px-3 rounded"
                placeholder="kc@domain.com"
                type="email"
              ></input>
            </label>
            <label className="block mb-3">
              <span>Comment</span>
              <textarea
                {...register("comment", {required:true})}
                className="outline-none border w-full py-2 px-3 rounded"
                placeholder="Your Views"
                type="text"
                rows={8}
              ></textarea>
            </label>

            <div className="flex flex-col">
              {formState.errors.name && (<span className="text-red-500">-The name field is required</span>)}
              {formState.errors.email && (<span className="text-red-500">-The email field is required</span>)}
              {formState.errors.comment && (<span className="text-red-500">-The comment field is required</span>)}
            </div>

            <input type="submit" className="w-full rounded-md text-center text-white font-semibold py-2 bg-yellow cursor-pointer hover:bg-[#f4c33d]"/>
          </form>
        )}

        {post.comments[0] ? (
          <div className="mt-5 p-2 max-w-2xl mx-auto rounded-md shadow-sm shadow-yellow">
            <h2 className="text-3xl mx-auto w-fit mb-2">Comments</h2>
            {post.comments.map((comment)=>(
                <p key={comment._id} id={comment._id}><span className="font-medium mr-1">{comment.name}:</span>{comment.comment}</p>
            ))}
          </div>

        ):(
          <h2 className="text-2xl font-semibold mt-2">No Comments</h2>
        )}
      </div>
    </>
  );
}

export const getStaticPaths = async () => {
  const query = `*[_type == "post"]{
    slug{
      current
    }
  }`;

  const posts = await client.fetch(query);
  const paths = posts.map((post) => ({ params: { slug: post.slug.current } }));
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params }) => {
  let query = `*[_type == "post" && slug.current==$slug][0]{
    _id,
    title,
    mainImage,
    "comments":*[
      _type == "comment" &&
      post._ref == ^._id &&
      approved == true
    ],
    author->{
      name,
      image,
			"bioo":bio[0].children[0].text
    },
    description,
    _createdAt,
    body
  }`;

  const post = await client.fetch(query, { slug: params.slug });
  return {
    props: {
      post,
    },
    revalidate: 1,
  };
};

export default Post;