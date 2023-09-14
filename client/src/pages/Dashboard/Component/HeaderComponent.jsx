import { CardHeader, Typography } from "@material-tailwind/react";

const HeaderComponent = ({params}) => {
    
    return (
        <>
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <div className="mb-8 flex items-center justify-between gap-8">
                <Typography variant="h5" color="blue-gray">
                    DASHBOARD
                </Typography>
                </div>
            </CardHeader>
        </>
    );
};

export default HeaderComponent;
