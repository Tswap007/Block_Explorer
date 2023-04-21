import { useEffect, useState } from "react";
import Block from "./Block";


export default function BlockList({ blockNumber }) {
    const [blocks, setBlocks] = useState([]);

    useEffect(() => {
        const newBlocks = Array.from({ length: 10 }, (_, index) => blockNumber - index).filter(block => block >= 0);
        setBlocks(newBlocks);
    }, [blockNumber]);


    return (
        blocks.map(block => {
            return <Block blockNumber={block} key={block} />
        })
    )
}
