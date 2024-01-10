import { Card, CardContent } from "@/Component/ui/card";
import { Button } from "@/Component/ui/button";
import { Input } from "@/Component/ui/input";
import { Label } from "@/Component/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Component/ui/select";
import { useNavigate, useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios, { AxiosError } from "axios";
import { AppContext, ContextType } from "../../Provider";
import { useContext, useEffect } from "react";

interface InterfaceProps {
    id?: string;
    name?: string;
    status?: boolean;
}

const validationSchema = yup
    .object({
        id: yup.string().required(),
        name: yup.string().required(),
        status: yup.boolean().required(),
    })
    .required();

const EditorContainer = () => {
    const navigate = useNavigate();
    const context = useContext<ContextType>(AppContext);
    const setOpen = context?.setOpen;
    const setMessage = context?.setMessage;

    const { id } = useParams();
    const { handleSubmit, control, reset } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const handleError = (message: string) => {
        setOpen?.(true);
        setMessage?.(message);
    };

    const token = window.localStorage.getItem("token");

    const getCategory = async () => {
        try {
            const response = await axios.get(
                `https://mock-api.arikmpt.com/api/category/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            reset({
                id: response.data.data.id,
                name: response.data.data.name,
                status: response.data.data.status,
            });
        } catch (error) {
            const err = error as AxiosError as any;
            const errors = err.response?.data?.errors;
            if (Array.isArray(errors)) {
                return;
            }
            handleError(errors);
        }
    };

    useEffect(() => {
        getCategory();
    }, [id]);

    const onSubmit = async (data: InterfaceProps) => {
        try {
            await axios.put(
                "https://mock-api.arikmpt.com/api/category/update",
                {
                    id: id,
                    name: data.name,
                    is_active: data.status,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            navigate("/categoryContainer");
        } catch (error) {
            const err = error as AxiosError as any;
            const errors = err.response?.data?.errors;
            if (Array.isArray(errors)) {
                return;
            }
            handleError(errors);
        }
    };

    return (
        <div className="login-box">
            <Card>
                <CardContent className={"login-content"}>
                    <h2>Edit Category</h2>
                    <Button
                        variant="secondary"
                        onClick={() => {
                            navigate("/categoryContainer");
                        }}
                    >
                        Return
                    </Button>
                    <div className="login-form">
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    value={field.value}
                                    onChange={field.onChange}
                                    placeholder="Name"
                                    // helperText={errors.name?.message}
                                    // error={!!errors.name}
                                />
                            )}
                        />
                        <form>
                            <Label>Status</Label>
                            <Controller
                                name="status"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        // labelId="demo-simple-select-label"
                                        // id="demo-simple-select"
                                        value={field.value ? "1" : "0"}
                                        // label="Age"
                                        onValueChange={field.onChange}
                                        // size="small"
                                    >
                                        <SelectTrigger className="w-[280px]">
                                            <SelectValue placeholder="Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value={"1"}>
                                                Active
                                            </SelectItem>
                                            <SelectItem value={"0"}>
                                                Disabled
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </form>
                    </div>
                    <Button
                        variant="outline"
                        // fullWidth
                        onClick={handleSubmit(onSubmit)}
                    >
                        Submit
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default EditorContainer;
