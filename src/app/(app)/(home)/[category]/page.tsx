type Props = {
  params: Promise<{
    category: string;
  }>;
};
const Page = async ({ params }: Props) => {
  const { category } = await params;
  return <div className="">Category Page : {category}</div>;
};
export default Page;
