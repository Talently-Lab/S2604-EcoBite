import { RestaurantDetail } from "@/components/RestaurantDetail";

export default async function RestaurantPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <RestaurantDetail key={id} id={encodeURIComponent(id)} />;
}
