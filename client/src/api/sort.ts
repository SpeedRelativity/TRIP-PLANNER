type ActivityType = {
  id: string
  title: string
  location: string
  description: string
}

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const fetchSortedPlan = async (activities: ActivityType[]) => {
    console.log("sort.ts sent to backend", activities);
  const res = await fetch(`${backendUrl}/api/sort`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ activities })
  });

  if (!res.ok) throw new Error("Sort failed");
  return await res.json();
};

export default fetchSortedPlan
