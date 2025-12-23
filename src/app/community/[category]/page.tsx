import CommunityTemplate from '@/components/community/CommunityTemplate';

export default async function CommunityCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;

  return <CommunityTemplate category={category as any} />;
}
