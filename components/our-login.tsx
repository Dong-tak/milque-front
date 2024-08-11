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
import { Github, Instagram } from "lucide-react";

export function OurLogIn() {
  return (
    <Card className="h-[982px] w-[756px] space-y-6 bg-background px-[166px] py-[221px]">
      <CardHeader className="p-0">
        <CardTitle className="text-center">로그인</CardTitle>
        <CardDescription className="text-center">
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 p-0">
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
        <Button size={"long"}>Save changes</Button>
      </CardContent>
      <CardContent className="flex items-center p-0">
        <Separator />
        <div className="w-full text-center text-muted-foreground body-normal-body-01">
          OR Login WITH
        </div>
        <Separator />
      </CardContent>
      <CardContent className="space-y-2 p-0">
        <Button variant={"background"} size={"long"} className="gap-2">
          <Github className="h-4 w-4" />
          GitHub
        </Button>
        <Button variant={"background"} size={"long"} className="gap-2">
          <Instagram className="h-4 w-4" />
          Instagram
        </Button>
      </CardContent>
      <CardContent className="flex items-center justify-center py-6">
        <div>Don't have an account?</div>
        <Label>Sign up</Label>
      </CardContent>
    </Card>
  );
}
