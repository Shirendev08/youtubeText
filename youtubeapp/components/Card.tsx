import { useEffect, useState } from "react";
import { BellRing, Check, VideoIcon } from "lucide-react";
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
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  // Function to get a YouTube thumbnail based on the video URL
  const getThumbnailUrl = (videoUrl: string) => {
    const videoId = videoUrl.split("v=")[1]?.split("&")[0] || videoUrl.split("/").pop();
    const thumb = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    return thumb
  };

  if (loading) return <p>Loading history...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-4 justify-items-center">
      {conversionHistory.map((item, index) => (
        <Card key={index} className={cn("w-[400px]", className)}>
          <CardHeader>
            <CardTitle>Conversion History</CardTitle>
            <CardDescription>
              Created At: {new Date(item.created_at).toLocaleString()}
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center space-x-4 rounded-md border p-4">
                <VideoIcon/>
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
              <p className="text-sm font-medium leading-none">
                Converted Text:
              </p>
              <p className="text-sm text-muted-foreground">
                {item.converted_text}
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              <Check /> Mark as Read
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
