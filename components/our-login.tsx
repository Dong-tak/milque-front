import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export function OurLogIn() {
  return (
    <Card className="h-[982px] w-[756px] bg-background px-[166px] py-[221px]">
      <CardHeader>
        <CardTitle className="text-center">로그인</CardTitle>
        <CardDescription className="text-center">
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-[6px]">
          <Label htmlFor="email" className="h-10">
            Email
          </Label>
          <Input id="email" placeholder="name@example.com" />
        </div>
        <div className="space-y-[6px]">
          <Label htmlFor="password" className="h-10">
            Password
          </Label>
          <Input id="password" />
        </div>
      </CardContent>
      <CardFooter>
        <Button size={"long"}>Save changes</Button>
      </CardFooter>
      <Separator />
    </Card>
  );
}
