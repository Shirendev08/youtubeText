import { useEffect, useState } from "react";
import { VideoIcon, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { history } from "@/lib/auth";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type HistoryItem = {
  video_url: string;
  converted_text: string;
  created_at: string;
};

export function CardDemo({ className }: { className?: string }) {
  const [conversionHistory, setConversionHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedText, setSelectedText] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const data = await history();
        const sortedData = data.sort(
          (a: HistoryItem, b: HistoryItem) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        setConversionHistory(sortedData);
      } catch (err) {
        setError("Failed to load history.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const getThumbnailUrl = (videoUrl: string) => {
    const videoId = videoUrl.split("v=")[1]?.split("&")[0] || videoUrl.split("/").pop();
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  };

  const TruncatedText = ({ text }: { text: string }) => {
    const maxCharacters = 100; // Set the maximum number of characters to display initially

    return (
      <p className="text-sm text-muted-foreground">
        {text.length > maxCharacters ? `${text.slice(0, maxCharacters)}...` : text}
        {text.length > maxCharacters && (
          <button
            onClick={() => setSelectedText(text)}
            className="text-blue-500 ml-2"
          >
            See More
          </button>
        )}
      </p>
    );
  };

  if (loading) return <p>Loading history...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-4 justify-items-center flex flex-row">
      {conversionHistory.map((item, index) => (
        <Card key={index} className={cn("w-[30%] mt-4 mr-10", className)}>
          <CardHeader>
            <CardTitle>Conversion History</CardTitle>
            <CardDescription>
              Created At: {new Date(item.created_at).toLocaleString()}
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center space-x-4 rounded-md border p-4">
              <VideoIcon />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">Video URL:</p>
                <p className="text-sm text-muted-foreground">
                  <Link href={item.video_url} target="_blank">
                    {item.video_url}
                  </Link>
                </p>
              </div>
            </div>
            <div className="space-y-1">
              <Image
                src={getThumbnailUrl(item.video_url)}
                alt="Video Thumbnail"
                objectFit="cover"
                width={300}
                height={150}
              />
              <p className="text-sm font-medium leading-none">Converted Text:</p>
              <TruncatedText text={item.converted_text} />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              <Check /> Mark as Read
            </Button>
          </CardFooter>
        </Card>
      ))}

      {selectedText && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
          <div className=" rounded-lg p-6 mx-10 w-full">
            <h2 className="text-lg font-bold mb-4">Full Converted Text</h2>
            <p className="mb-6">{selectedText}</p>
            <Button
              onClick={() => setSelectedText(null)}
              className="w-full text-white hover:bg-red-600"
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
