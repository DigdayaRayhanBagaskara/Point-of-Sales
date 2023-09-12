/* eslint-disable no-unused-vars */

import { Card, CardHeader, Typography } from "@material-tailwind/react";

const GrossProfit = () => {
  return (
    <>
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Gross Profit
              </Typography>
            </div>
          </div>
        </CardHeader>
      </Card>
    </>
  );
};

export default GrossProfit;
