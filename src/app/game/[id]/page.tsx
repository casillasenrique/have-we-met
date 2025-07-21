import { Nav } from "@/app/components/Nav";
import { useParams } from "next/navigation";

export default function Game() {
    const params = useParams();
    const { id } = params;

    return (
        <div>
            <Nav />
            Game ID: {id}
        </div>
    );
}
