import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import residential from "@/assets/project-residential.jpg";
import commercial from "@/assets/project-commercial.jpg";
import civil from "@/assets/project-civil.jpg";
import { SiteLayout } from "@/components/SiteLayout";
import { QuoteForm } from "@/components/QuoteForm";
import { getPost, posts, type Post } from "@/data/blog";

const images: Record<string, string> = { residential, commercial, civil };

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }): Post => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Article not found | Urban T Construction Co." }, { name: "robots", content: "noindex" }] };
    }
    return {
      meta: [
        { title: `${loaderData.title} | Urban T Construction Co.` },
        { name: "description", content: loaderData.excerpt },
        { property: "og:title", content: loaderData.title },
        { property: "og:description", content: loaderData.excerpt },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: loaderData.title,
            description: loaderData.excerpt,
            datePublished: loaderData.date,
            author: { "@type": "Organization", name: loaderData.author },
            publisher: { "@type": "Organization", name: "Urban T Construction Co." },
          }),
        },
      ],
    };
  },
  component: PostPage,
});

function PostPage() {
  const post: Post = Route.useLoaderData();
  const more = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <SiteLayout>
      <section className="bg-primary text-primary-foreground">
        <div className="container-x py-16 md:py-20">
          <Link to="/blog" className="eyebrow text-gold">
            ← Blog & resources
          </Link>
          <h1 className="mt-4 max-w-3xl text-4xl leading-[1.05] md:text-5xl">{post.title}</h1>
          <p className="mt-5 text-sm text-primary-foreground/70">
            {post.category} · {new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })} ·{" "}
            {post.readMinutes} min read · {post.author}
          </p>
        </div>
      </section>

      <div className="container-x grid gap-12 py-16 lg:grid-cols-[1.4fr_1fr]">
        <article>
          <img
            src={images[post.image]}
            alt={post.title}
            width={1280}
            height={720}
            className="aspect-[16/9] w-full object-cover"
          />
          <p className="mt-8 text-lg text-muted-foreground">{post.excerpt}</p>
          {post.body.map((section) => (
            <section key={section.heading} className="mt-10">
              <h2 className="text-2xl">{section.heading}</h2>
              {section.paragraphs.map((p) => (
                <p key={p} className="mt-4 leading-relaxed text-foreground/85">
                  {p}
                </p>
              ))}
              {section.bullets ? (
                <ul className="mt-4 space-y-2">
                  {section.bullets.map((b) => (
                    <li key={b} className="flex gap-2.5 text-foreground/85">
                      <span className="mt-2 size-1.5 shrink-0 bg-accent" />
                      {b}
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}

          <div className="mt-12 border-l-4 border-accent bg-secondary p-6">
            <p className="font-display text-lg font-bold">Want these numbers for your own project?</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Run the estimator for an indicative range, or send us the drawings and we'll return a costed BOQ.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link to="/pricing" className="bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground">
                Open the estimator
              </Link>
              <Link to="/contact" className="border border-border bg-card px-4 py-2 text-sm hover:border-accent">
                Request a BOQ
              </Link>
            </div>
          </div>

          <h2 className="mt-14 text-2xl">More from the site</h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-3">
            {more.map((p) => (
              <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }} className="surface-card p-5 hover:border-accent">
                <p className="eyebrow">{p.category}</p>
                <p className="mt-2 font-display font-bold leading-snug">{p.title}</p>
              </Link>
            ))}
          </div>
        </article>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <QuoteForm />
        </aside>
      </div>
    </SiteLayout>
  );
}
