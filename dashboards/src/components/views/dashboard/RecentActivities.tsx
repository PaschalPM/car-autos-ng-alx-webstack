import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import { baseColor } from "../../../libs/utils";


export default function Overview() {
  return (
    <Card>
      <CardContent>
        <Typography variant={"h6"} sx={{ fontWeight: 500, color:baseColor }} gutterBottom>
          Recent Activities
        </Typography>
        
      </CardContent>
    </Card>
  );
}
