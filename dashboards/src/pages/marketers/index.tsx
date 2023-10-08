import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { styled } from "@mui/material/styles";
import usePageTitleSetter from "../../libs/hooks/setPageTitle";
import { Link } from "react-router-dom";
import FloatingButton from "../../components/views/adverts/FloatingButton";
import {
  useManagerMarketersQuery,
  useManagerSearchedMarketersQuery,
} from "../../libs/hooks/queries/marketers";
import SectionFeedBack from "../../components/views/SectionFeedback";
import { debounce } from "lodash";
import { useState } from "react";
import { urlPath } from "../../libs/utils";

const MyMarketerListItem = ({
  marketerProfile,
}: {
  marketerProfile: UserValues;
}) => (
  <ListItem divider={true}>
    <ListItemAvatar>
      <Link to={`/dashboard/my-marketers/${marketerProfile.username}`}>
        <Avatar> {marketerProfile.username.slice(0, 1)} </Avatar>
      </Link>
    </ListItemAvatar>
    <ListItemText
      primary={
        <Link to={`/dashboard/my-marketers/${marketerProfile.username}`}>
          {marketerProfile.firstname} {marketerProfile.lastname}
        </Link>
      }
    />
    <Stack height={"100%"} alignItems={"space-between"}>
      <Link
        to={`/dashboard/my-marketers/${marketerProfile.username}/edit`}
        state={{ userProfile: marketerProfile }}
      >
        <IconButton>
          <EditIcon fontSize="small" color="info" />
        </IconButton>
      </Link>
      <IconButton>
        <DeleteIcon fontSize="small" color="error" />
      </IconButton>
    </Stack>
  </ListItem>
);

const SearchTextField = styled(TextField)({
  "& .MuiSvgIcon-root": {
    marginRight: "1rem",
  },
});

export default function Marketers() {
  usePageTitleSetter("Marketers");
  const { data: marketers, isLoading, isError } = useManagerMarketersQuery();
  const [q, setQ] = useState("");
  const {
    data: searchedMarketers,
    isLoading: isSearchedLoading,
    isError: isSearchedError,
  } = useManagerSearchedMarketersQuery(q as string);

  const debounceInputHander = debounce(
    (ev) => setQ((ev.target as HTMLInputElement).value),
    300
  );
 

  return (
    <>
    <Paper>
      <Container sx={{ p: 2 }}>
        <SearchTextField
          type="search"
          size="small"
          fullWidth
          onInput={debounceInputHander}
          placeholder="Search for your marketer here"
          InputProps={{ startAdornment: <SearchIcon /> }}
        />
        {q ? (
          <SectionFeedBack
            isLoading={isSearchedLoading}
            isError={isSearchedError}
            data={searchedMarketers as UserValues[]}
          >
            <>
              <List>
                {searchedMarketers?.map((marketerProfile) => (
                  <MyMarketerListItem marketerProfile={marketerProfile} />
                ))}
              </List>
            </>
          </SectionFeedBack>
        ) : (
          <SectionFeedBack
            isLoading={isLoading}
            isError={isError}
            data={marketers as UserValues[]}
          >
            <>
              <List>
                {marketers?.map((marketerProfile) => (
                  <MyMarketerListItem marketerProfile={marketerProfile} />
                ))}
              </List>
            </>
          </SectionFeedBack>
        )}
      </Container>
    </Paper>
    <FloatingButton urlPath={urlPath("my-marketers:new")}/>
    </>
  );
}
