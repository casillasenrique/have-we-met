import { useParams } from "next/navigation";

export default function Game() {
    const params = useParams();
    const { id } = params;

    return (
        <div>
            Game ID: {id}
        </div>
    );
}
