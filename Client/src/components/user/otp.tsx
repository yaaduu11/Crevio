import { cn } from "../../lib/utils"
import { Button } from "../ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"

import { InputOTPControlled } from "./input-otp"

export function OtpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  
  return (
    <div className={cn("flex flex-col gap-6 ", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Verify Your Account</CardTitle>
          <CardDescription>
            We are sending as OTP to validate your<br/>email address, Hang on!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="flex justify-center">
                    <InputOTPControlled/>
                </div>
                <div className="flex justify-center">
                    <Button type="submit" className="w-1/2">
                    Login
                    </Button>
                </div>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

    </div>
  )
}
