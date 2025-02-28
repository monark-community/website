import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {
  name: string;
  title: string;
  imageUrl: string;
};

export default function AvatarCard({ name, title, imageUrl }: Props) {
  return (
    <div className="flex items-center gap-4 p-4 border rounded-lg shadow-sm">
      <Avatar className="w-12 h-12">
        <AvatarImage src={imageUrl} alt={name} />
        <AvatarFallback>{name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div>
        <p className="text-lg font-medium">{name}</p>
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>
    </div>
  );
}
