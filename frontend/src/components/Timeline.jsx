export default function Timeline({lead}){

return(

<div>

<h3>Activity</h3>

{lead.timeline.map((t,i)=>(
<p key={i}>{t}</p>
))}

</div>

);

}