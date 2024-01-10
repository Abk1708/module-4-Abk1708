/* eslint-disable no-empty */
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Component/ui/table";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "@/Component/ui/button";

interface Category {
    id: string;
    name: string;
    status: boolean;
}

const CategoryContainer = () => {
    const navigate = useNavigate();
    const [rows, setRows] = useState<Category[]>([]);

    const handleEdit = (id: string) => () => {
        navigate(`/editorContainer/${id}`);
    };

    const token = window.localStorage.getItem("token");

    const fetchList = async () => {
        const response = await axios.get(
            "https://mock-api.arikmpt.com/api/category",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        setRows(response.data.data);
    };

    useEffect(() => {
        fetchList();
    }, []);

    const handleDelete = (id: string) => async () => {
        try {
            await axios.delete(
                `https://mock-api.arikmpt.com/api/category/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            fetchList();
        } catch (error) {}
    };

    return (
        <>
            <Button
                variant="link"
                onClick={() => {
                    navigate("/");
                }}
            >
                Logout
            </Button>
            <Button
                variant="link"
                onClick={() => {
                    navigate("/adderContainer");
                }}
            >
                Add New Category
            </Button>
            <Table>
                <TableCaption>Category List.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Id</TableHead>
                        <TableHead>Names</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell className="font-medium">
                                {row.id}
                            </TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>
                                {row.status ? "Active" : "Disabled"}
                            </TableCell>
                            <TableCell className="text-right">
                                <div className="action">
                                    <Button
                                        variant="default"
                                        onClick={handleEdit(row.id)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        onClick={handleDelete(row.id)}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
};

export default CategoryContainer;
