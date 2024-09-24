import Project from "./project"
import WhoFollow from "./who-follow"

export default function SideBar() {
  return (
    <div className="flex flex-col w-full xl:w-2/3 p-4 gap-4">
      <WhoFollow/>
      <Project/>
    </div>
  )
}
