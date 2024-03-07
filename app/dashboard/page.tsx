"use client"
import { useSession } from "next-auth/react"

export default function DashboardPage() {

  const { data: session, status } = useSession();

  return (
    <div className="col-span-12">
      <p>Dolore ea est dolore fugiat. Quis cupidatat ea veniam sint laborum. Veniam elit nulla voluptate velit labore fugiat cupidatat aute culpa sit. Ad exercitation in amet duis tempor labore mollit elit esse nostrud. In occaecat sint deserunt officia tempor eiusmod. Ex consequat irure ad non deserunt do nostrud sunt ex eiusmod veniam in magna.

        Occaecat sunt voluptate anim mollit adipisicing consectetur adipisicing commodo duis ipsum do pariatur laboris. In amet eiusmod velit consectetur ex excepteur. Consequat in sunt esse ea incididunt qui velit laboris amet incididunt dolor veniam. Aliquip anim velit incididunt voluptate eu incididunt eiusmod incididunt. Consectetur excepteur dolor ea nostrud et qui cupidatat eiusmod eiusmod consectetur deserunt.

        Incididunt do dolor sit nulla nulla nulla sunt ex Lorem. Non dolor mollit incididunt exercitation occaecat aliquip consequat. Dolore nisi ipsum anim consectetur. Adipisicing non occaecat incididunt pariatur reprehenderit aliquip ad aliqua nostrud pariatur eu proident. Consectetur ex ea enim consequat nulla ex. Laborum excepteur enim labore officia cupidatat duis commodo exercitation id incididunt magna commodo Lorem.

        Proident do Lorem laboris pariatur enim amet dolor culpa aliquip fugiat voluptate laborum minim do. Veniam esse sit ad adipisicing culpa fugiat irure cupidatat voluptate non magna veniam aute. Duis veniam nisi dolor aute mollit. Est ex id quis deserunt. Eiusmod voluptate magna minim eu eu labore cillum quis cupidatat.

        Ullamco deserunt do laborum ipsum tempor aliquip fugiat id non aliquip veniam laborum. Ex quis incididunt pariatur est adipisicing ullamco proident minim mollit quis esse. Incididunt incididunt officia officia dolore esse Lorem irure reprehenderit ut officia amet consectetur nulla nostrud. Cupidatat voluptate ad laboris exercitation dolor elit dolor irure aliquip. Veniam elit dolor consequat cillum veniam deserunt anim. Excepteur elit commodo esse elit aute.

        Sunt dolor Lorem laboris veniam duis cillum pariatur minim. Dolore aute dolore reprehenderit nisi magna adipisicing in velit sit. Deserunt ea elit laboris ullamco duis reprehenderit incididunt. Aliquip pariatur duis incididunt irure elit eu sint cupidatat reprehenderit amet excepteur enim. Exercitation minim ea dolore proident et Lorem. Cupidatat commodo exercitation dolor ipsum occaecat pariatur ipsum ipsum voluptate commodo proident incididunt officia nulla.

        Sit duis elit reprehenderit magna excepteur fugiat anim officia consequat est occaecat consectetur. Eu dolore anim voluptate ut reprehenderit nulla enim commodo laborum. Eiusmod quis ad anim veniam non nostrud mollit duis. Culpa magna minim laborum sit ullamco ea esse consequat. Ex nostrud esse tempor sunt ad culpa.

        Nostrud duis adipisicing fugiat ipsum. Laboris ut laboris laboris anim sint sit incididunt amet amet pariatur labore occaecat. Id voluptate deserunt occaecat aliqua eu ullamco nulla.

        Commodo laboris laboris ullamco excepteur. Do est minim pariatur pariatur exercitation sunt culpa ullamco eiusmod. Ex esse magna ut qui ad non.

        Labore ex consequat dolor deserunt veniam ad nulla. Et duis adipisicing irure consectetur consequat duis laborum occaecat. Reprehenderit esse voluptate veniam officia cupidatat officia exercitation culpa do non. Occaecat sunt consectetur ad aliquip Lorem sit dolore nulla ad aute laboris Lorem qui. Mollit non labore eu ea eiusmod. Velit consectetur deserunt pariatur ipsum excepteur esse velit id voluptate.</p>
    </div>
  )
}
