import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import state, { setFriends } from "../state/index.js";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage.jsx";

const Friend = ({ friendId, name, subtitle, userPicture }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;

  const isFriend = friends.find((friend) => friend._id === friendId);
  const patchFriend = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:3001/users/${_id}/${friendId}`,
        null,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
        { withCredentials: true }
      );

      const data = response.data;
      dispatch(setFriends({ friends: data }));
    } catch (error) {
      console.error("Error during PATCH request:", error);
    }
  };

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicture} size="55px" />
        <Box
          onClick={() => {
            navigate(`profile/${friendId}`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
        </Box>
      </FlexBetween>
      <IconButton
        onClick={() => patchFriend()}
        sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
      >
        {isFriend ? (
          <PersonRemoveOutlined color={primaryDark} />
        ) : (
          <PersonAddOutlined color={primaryLight} />
        )}
      </IconButton>
    </FlexBetween>
  );
};

export default Friend;
