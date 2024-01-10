/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { Button } from "@/Component/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Component/ui/card";
import { Input } from "@/Component/ui/input";
import { Label } from "@/Component/ui/label";

const RegisterCard = () => {
    const navigate = useNavigate();
    const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

    const submitSignUp = async (account: {
        fullName?: string;
        email: any;
        passWord: any;
    }) => {
        const response = await fetch(
            "https://mock-api.arikmpt.com/api/user/register",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: account.fullName,
                    email: account.email,
                    password: account.passWord,
                }),
            }
        );

        const data = await response.json();
        console.log(data);
        navigate("/");
    };

    const formMik = useFormik({
        initialValues: {
            fullName: "",
            email: "",
            passWord: "",
        },
        onSubmit: (values, { resetForm }) => {
            submitSignUp(values);
            console.log(values);
            resetForm();
        },
        validationSchema: yup.object({
            fullName: yup
                .string()
                .min(8, "Please input a valid name")
                .required("Please input your full name"),
            email: yup
                .string()
                .min(10, "Email length is not valid")
                .email("Valid email is required")
                .required("Please input your registered email account"),
            passWord: yup
                .string()
                .matches(passwordRules, {
                    message:
                        "Password must at least have 5 character, 1 upper case letter, 1 lower case letter, 1 numeric digit.",
                })
                .required("Please input a password"),
        }),
    });

    const { errors, values, handleChange, handleSubmit } = formMik;
    const { fullName, email, passWord } = values;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Register Form</CardTitle>
                <CardDescription>
                    Please input the required credential to register an account.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form action="#" onSubmit={handleSubmit} method="POST">
                    <div>
                        <div>
                            <Label htmlFor="fullName">Name</Label>
                            <Input
                                name="fullName"
                                type="text"
                                placeholder="John Doe"
                                value={fullName}
                                onChange={handleChange("fullName")}
                                required
                            />
                            {errors.fullName && <p>{errors.fullName}</p>}
                        </div>
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                type="email"
                                name="email"
                                placeholder="@mail.com"
                                value={email}
                                onChange={handleChange("email")}
                                required
                            />
                            {errors.email && <p>{errors.email}</p>}
                        </div>
                        <div>
                            <Label htmlFor="passWord">Password</Label>
                            <Input
                                type="password"
                                name="passWord"
                                placeholder="Password"
                                value={passWord}
                                onChange={handleChange("passWord")}
                                required
                            />
                            {errors.passWord && <p>{errors.passWord}</p>}
                        </div>
                        <Button type="submit">Register Account</Button>
                    </div>
                </form>
            </CardContent>
            <CardFooter>
                <Button
                    variant="secondary"
                    onClick={() => {
                        navigate("/");
                    }}
                >
                    Log In
                </Button>
            </CardFooter>
        </Card>
    );
};

export default RegisterCard;
