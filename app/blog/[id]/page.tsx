

import Post from "../../component/post";
// @ts-ignore
import {http} from "@/utils/http";


export default async function Page({params}: { params: Promise<{ id: number }> }) {
    const {id} = await params
    const res=await http.get(`api/blog/${id}`)
        .catch(err => console.log(err));
    console.log(res)
    return (
        <div className="main">
            <h1>this is item content {id}</h1>
            <div>1092u31j23oipj1o2i3jo12j3o123</div>
            <Post content={res.data[0]}/>
        </div>
    )
}
