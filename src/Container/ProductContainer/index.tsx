import { Button, Card, Input, Typography } from "@/Component";
import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

interface DataProps {
    fullName: string;
    email: string;
    birthDate: string;
    streetAddr: string;
    city: string;
    state: string;
    zipCode: number;
    userName: string;
    passWord: string;
}

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

const ProductContainer = () => {
    const [users, setUsers] = useState<DataProps[]>([]);
    const [selectedUser, setSelectedUser] = useState<DataProps>();
    const [step, setStep] = useState<number>(1);

    const handleNext = () => {
        if (step === 3) {
            return;
        }
        setStep((prevState) => prevState + 1);
    };

    const handlePrevious = () => {
        if (step === 1) {
            return;
        }
        setStep((prevState) => prevState - 1);
    };

    const formMik = useFormik({
        initialValues: selectedUser ?? {
            fullName: "",
            email: "",
            birthDate: "",
            streetAddr: "",
            city: "",
            state: "",
            zipCode: 12345,
            userName: "",
            passWord: "",
        },
        onSubmit: (values, { resetForm }) => {
            const updatedUsers = [...users, values];
            setSelectedUser(values);
            setUsers(updatedUsers);
            alert("Your Data has been successfully submitted!");
            console.log("Inputs Array:", users);
            formMik.setValues({
                fullName: "",
                email: "",
                birthDate: "",
                streetAddr: "",
                city: "",
                state: "",
                zipCode: 12345,
                userName: "",
                passWord: "",
            });
            resetForm();
            setStep(1);
        },
        validationSchema: yup.object({
            fullName: yup.string().required("Please enter your full name."),
            email: yup
                .string()
                .email("Email is not valid")
                .required("Valid email is required."),
            birthDate: yup.date().required("Please enter your date of birth."),
            streetAddr: yup
                .string()
                .required("Please enter your street address."),
            city: yup.string().required("Please enter your city origin."),
            state: yup.string().required("Please enter your state origin."),
            zipCode: yup.number().required("Please enter your ZipCode."),
            userName: yup.string().required("Please enter your UserName."),
            passWord: yup
                .string()
                .matches(passwordRules, {
                    message: "Password does not follow the required format.",
                })
                .required(
                    "Password must at least have 5 character, 1 upper case letter, 1 lower case letter, 1 numeric digit."
                ),
        }),
        enableReinitialize: true,
    });

    return (
        <Card
            border
            className={
                "flex flex-col gap-2.5 bg-gradient-to-r from-stone-900 via-green-600 to-slate-400"
            }
        >
            <Card border>
                <form onSubmit={formMik.handleSubmit}>
                    {step === 1 && (
                        <div>
                            <div>
                                <Typography>{"Full Name"}</Typography>
                                <Input
                                    inputType="text"
                                    className="block border-neutral-400 border"
                                    name={"fullName"}
                                    value={formMik.values.fullName}
                                    onChange={formMik.handleChange("fullName")}
                                />
                                {formMik.errors.fullName && (
                                    <Typography>
                                        {formMik.errors.fullName}
                                    </Typography>
                                )}
                            </div>
                            <div>
                                <Typography>{"Email Address"}</Typography>
                                <Input
                                    inputType="email"
                                    className="block border-neutral-400 border"
                                    name={"email"}
                                    value={formMik.values.email}
                                    onChange={formMik.handleChange("email")}
                                />
                                {formMik.errors.email && (
                                    <Typography>
                                        {formMik.errors.email}
                                    </Typography>
                                )}
                            </div>
                            <div className="my-4">
                                <Typography>{"Date of Birth"}</Typography>
                                <Input
                                    inputType="date"
                                    className="block border-neutral-400 border"
                                    name={"birthDate"}
                                    value={formMik.values.birthDate}
                                    onChange={formMik.handleChange("birthDate")}
                                />
                                {formMik.errors.birthDate && (
                                    <Typography>
                                        {formMik.errors.birthDate}
                                    </Typography>
                                )}
                            </div>
                        </div>
                    )}
                    {step === 2 && (
                        <div>
                            <div>
                                <Typography>{"Street Address"}</Typography>
                                <Input
                                    inputType="textarea"
                                    rows={3}
                                    className="block border-neutral-400 border"
                                    name={"streetAddr"}
                                    value={formMik.values.streetAddr}
                                    onChange={formMik.handleChange(
                                        "streetAddr"
                                    )}
                                />
                                {formMik.errors.fullName && (
                                    <Typography>
                                        {formMik.errors.fullName}
                                    </Typography>
                                )}
                            </div>
                            <div>
                                <Typography>{"City"}</Typography>
                                <Input
                                    inputType="text"
                                    className="block border-neutral-400 border"
                                    name={"city"}
                                    value={formMik.values.city}
                                    onChange={formMik.handleChange("city")}
                                />
                                {formMik.errors.city && (
                                    <Typography>
                                        {formMik.errors.city}
                                    </Typography>
                                )}
                            </div>
                            <div>
                                <Typography>{"State"}</Typography>
                                <Input
                                    inputType="text"
                                    className="block border-neutral-400 border"
                                    name={"state"}
                                    value={formMik.values.state}
                                    onChange={formMik.handleChange("state")}
                                />
                                {formMik.errors.state && (
                                    <Typography>
                                        {formMik.errors.state}
                                    </Typography>
                                )}
                            </div>
                            <div>
                                <Typography>{"Zip Code"}</Typography>
                                <Input
                                    inputType="number"
                                    className="block border-neutral-400 border"
                                    name={"zipCode"}
                                    value={formMik.values.zipCode}
                                    onChange={formMik.handleChange("zipCode")}
                                />
                                {formMik.errors.zipCode && (
                                    <Typography>
                                        {formMik.errors.zipCode}
                                    </Typography>
                                )}
                            </div>
                        </div>
                    )}
                    {step === 3 && (
                        <div>
                            <div>
                                <Typography>{"Your Username"}</Typography>
                                <Input
                                    inputType="text"
                                    className="block border-neutral-400 border"
                                    name={"userName"}
                                    value={formMik.values.userName}
                                    onChange={formMik.handleChange("userName")}
                                />
                                {formMik.errors.userName && (
                                    <Typography>
                                        {formMik.errors.userName}
                                    </Typography>
                                )}
                            </div>
                            <div>
                                <Typography>{"Your Password"}</Typography>
                                <Input
                                    inputType="password"
                                    className="block border-neutral-400 border"
                                    name={"passWord"}
                                    value={formMik.values.passWord}
                                    onChange={formMik.handleChange("passWord")}
                                />
                                {formMik.errors.passWord && (
                                    <Typography>
                                        {formMik.errors.passWord}
                                    </Typography>
                                )}
                            </div>
                        </div>
                    )}
                    <Button
                        label={"Previous"}
                        onClick={handlePrevious}
                        type={"button"}
                        className={"bg-green-500"}
                    />
                    <Button
                        label={"Next"}
                        onClick={handleNext}
                        type={"button"}
                        className={"bg-green-500"}
                    />
                    <Button
                        label={"Submit"}
                        type={"submit"}
                        className={"bg-green-500"}
                        disabled={!formMik.isValid}
                    />
                </form>
            </Card>
        </Card>
    );
};

export default ProductContainer;
