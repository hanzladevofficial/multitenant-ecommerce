type Props = {
  params: Promise<{
    category: string;
    subcategory: string;
  }>;
};
const Page = async ({ params }: Props) => {
  const { category, subcategory } = await params;
  return (
    <div className="">
      Category Page : {category} <br />
      SubCategory : {subcategory}
    </div>
  );
};
export default Page;
