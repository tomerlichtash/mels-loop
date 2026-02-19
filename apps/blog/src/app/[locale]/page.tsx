import { redirect } from "next/navigation";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function BlogHomePage({ params }: PageProps) {
  const { locale } = await params;
  redirect("/posts");
}
