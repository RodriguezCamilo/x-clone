import Project from "./project"
import WhoFollow from "./who-follow"

export default function SideBar() {
  return (
    <div className="flex flex-col p-4 gap-4 fixed mr-[15%]">
      <WhoFollow/>
      <Project/>
    </div>
  )
}
