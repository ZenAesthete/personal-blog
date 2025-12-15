export function YouTube({ id }: { id: string }) {
  return (
    <div className="my-8 overflow-hidden rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-800">
      <iframe
        className="w-full aspect-video"
        src={`https://www.youtube.com/embed/${id}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}