// import { Button } from "./button"
// import { Input } from "./input"
// import { Label } from "./label"
// import { UserType } from "../../types/user.type"
// import {
//   Sheet,
//   SheetClose,
//   SheetContent,
//   SheetDescription,
//   SheetFooter,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "./sheet"



// export function SheetDemo() {
//   return (
//     <Sheet>
//       <SheetTrigger asChild>
//         <Button variant="outline">Open</Button>
//       </SheetTrigger>
//       <SheetContent>
//         <SheetHeader>
//           <SheetTitle>User Details</SheetTitle>
//           <SheetDescription>
//             Make changes to your profile here. Click save when you're done.
//           </SheetDescription>
//         </SheetHeader>
//         <div className="grid gap-4 py-4">
//           <div className="grid items-center grid-cols-4 gap-4">
//             <h2>name</h2>
//             <Input id="name" value="Pedro Duarte" className="col-span-3" />
//           </div>
//           <div className="grid items-center grid-cols-4 gap-4">
//             <Label htmlFor="username" className="text-right">
//               Username
//             </Label>
//             <Input id="username" value="@peduarte" className="col-span-3" />
//           </div>
//         </div>
//         <SheetFooter>
//           <SheetClose asChild>
//             <Button type="submit">Save changes</Button>
//           </SheetClose>
//         </SheetFooter>
//       </SheetContent>
//     </Sheet>
//   )
// }


import { Button } from "./button"
import { UserType } from "../../types/user.type"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet"
import { User } from "lucide-react"

// type SheetDemoProps = {
//   user: UserType
// }

type SheetDemoProps = {
    user: UserType
    open: boolean
    onOpenChange: (open: boolean) => void
  }
  

// export function SheetDemo({ user }: SheetDemoProps) {
//   return (
//     <Sheet>
//       <SheetTrigger asChild>
//         <Button variant="outline">Open</Button>
//       </SheetTrigger>

//       <SheetContent>
//         <SheetHeader>
//           <SheetTitle className="text-2xl font-bold text-gray-900">User Info</SheetTitle>
//           <SheetDescription className="text-gray-600">
//             Details of the user who uploaded this
//           </SheetDescription>
//         </SheetHeader>

//         <div className="p-6 mt-6 border border-gray-200 shadow-inner bg-gray-50 rounded-2xl">
//           <div className="flex items-center gap-4 mb-4">
//             <div className="flex items-center justify-center bg-blue-100 rounded-full w-14 h-14">
//               <User className="text-blue-600 w-7 h-7" />
//             </div>
//             <div>
//               <h3 className="text-xl font-semibold text-gray-900">{user.name || "Unnamed User"}</h3>
//               <p className="text-sm text-gray-600">{user.email}</p>
//             </div>
//           </div>
//         </div>

//         <SheetFooter className="mt-6">
//           <SheetClose asChild>
//             <Button
//               type="button"
//               className="px-5 py-2 text-white transition-all bg-black rounded-full shadow-md hover:scale-[1.03] hover:shadow-lg active:scale-100"
//             >
//               View Profile
//             </Button>
//           </SheetClose>
//         </SheetFooter>
//       </SheetContent>
//     </Sheet>
//   )
// }


export function SheetDemo({ user, open, onOpenChange }: SheetDemoProps) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        {/* Remove SheetTrigger */}
        <SheetContent className="bg-white">
          <SheetHeader>
            <SheetTitle className="text-2xl font-bold text-black">User Info</SheetTitle>
            <SheetDescription className="text-black">
              Details of the user who uploaded this
            </SheetDescription>
          </SheetHeader>
  
          <div className="p-6 mt-6 border border-gray-200 shadow-inner bg-gray-50 rounded-2xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center justify-center bg-blue-100 rounded-full w-14 h-14">
                <User className="text-blue-600 w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{user.name || "Unnamed User"}</h3>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
            </div>
          </div>
  
          <SheetFooter className="mt-6">
            <SheetClose asChild>
              {/* <Button
                type="button"
                className="px-5 py-2 text-white transition-all bg-black rounded-full shadow-md hover:scale-[1.03] hover:shadow-lg active:scale-100"
              >
                View Profile
              </Button> */}
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    )
  }
  