export default function AdminPage() {
  return (
    <div className="p-8 bg-white rounded-xl shadow-sm">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <p className="text-gray-600 mb-4">Backend functionality temporarily disabled.</p>

      <div className="grid gap-4">
        <div className="p-4 border rounded-lg">
          <h2 className="font-medium mb-2">Projects</h2>
          <p className="text-sm text-gray-500">Project management disabled</p>
        </div>

        <div className="p-4 border rounded-lg">
          <h2 className="font-medium mb-2">Blog Posts</h2>
          <p className="text-sm text-gray-500">Blog management disabled</p>
        </div>
      </div>
    </div>
  );
}
