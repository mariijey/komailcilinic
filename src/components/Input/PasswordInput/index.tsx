import { FocusEvent, forwardRef, SyntheticEvent, useState } from "react";
import {
  Box,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  useTheme,
} from "@mui/material";
import PasswordStrengthBar from "react-password-strength-bar";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import ClickAwayListener from "@mui/base/ClickAwayListener";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from "config";

type Props = {
  error: any;
  touch?: boolean;
  value: string;
  name: string;
  title?: string;
  onBlur: (e: FocusEvent<any, Element>) => void;
  setValue: (name: string, value: string) => void;
  autoFocus?: boolean;
  isShowStrong?: boolean;
};

const layout = {
  default: [
    "1 2 3 4 5 6 7 8 9 0",
    "` - = ] [ \\ ; ' , . /",
    "q w e r t y u i o p",
    "a s d f g h j k l",
    "z x c v b n m",
    "{space} {shift} {bksp} {enter}",
  ],
  shift: [
    "~ ! @ # $ % ^ &amp;",
    '- + } { | : " * ) ( > < ?',
    "Q W E R T Y U",
    "I O P A S D F G",
    "V B N M H J K L Z X C",
    "{space} {shift} {bksp} {enter}",
  ],
};

const PasswordInput = forwardRef(
  (
    {
      error,
      touch = true,
      value,
      name,
      title,
      onBlur,
      setValue,
      autoFocus = false,
      isShowStrong = false,
    }: Props,
    ref
  ) => {
    const theme = useTheme();

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showKeyboard, setShowKeyboard] = useState<boolean>(false);
    //we cant use refHook here because keyboardRef prop in Keyboard don't accept this
    const [keyboardRef, setKeyboardRef] = useState<any>();

    const [layoutName, setLayoutName] = useState<string>("default");

    const handleClickShowPassword = () => {
      setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: SyntheticEvent) => {
      event.preventDefault();
    };

    const clickOutsideHandler = () => {
      setShowKeyboard(false);
    };

    const handleShift = (button: string) => {
      if (button === "{shift}" && layoutName === "default")
        setLayoutName("shift");
      else if (button === "{shift}") setLayoutName("default");
    };

    const password_input_id = `${name}-password-input`;

    return (
      <ClickAwayListener onClickAway={clickOutsideHandler}>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            "& .MuiOutlinedInput-input": {
              fontFamily: "iransans-md !important",
              direction:
                theme.direction === "rtl" ? "ltr !important" : "initial",
              textAlign:
                theme.direction === "rtl" ? "right !important" : "initial",
            },
            "& .keyboard-wrapper": {
              position: "absolute",
              backgroundColor: theme.palette.common.white,
              top: "calc(100% + 0.2rem)",
              left: 0,
              right: "24px",
              borderRadius: "0.5rem",
              padding: "0.5rem",
              border: "1px solid #ededed",
              boxShadow: "4px 4px 2px -2px #d3d3d3",
              zIndex: 9999,
              direction: "ltr",
              "& .hg-button": {
                fontFamily:
                  theme.direction === "rtl"
                    ? "iransans-fa-md !important"
                    : "initial",
              },
              "& .hg-button-space": {
                fontWeight: "bold",
              },
              "& .hg-button-shift": {
                fontWeight: "bold",
              },
              "& .hg-button-bksp": {
                fontWeight: "bold",
              },
              "& .hg-button-enter": {
                fontWeight: "bold",
              },
            },
          }}
        >
          <Stack spacing={1}>
            <InputLabel htmlFor="password-login">
              {title ? title : "password"}
            </InputLabel>
            <OutlinedInput
              autoFocus={autoFocus}
              ref={ref}
              fullWidth
              error={Boolean(error && touch)}
              id={password_input_id}
              type={showPassword ? "text" : "password"}
              value={value}
              autoComplete={"new-password"}
              name={name}
              onBlur={onBlur}
              inputProps={{
                maxLength: PASSWORD_MAX_LENGTH,
              }}
              onChange={({ target }) => {
                keyboardRef?.setInput(target?.value);
                setValue(name, target?.value);
              }}
              endAdornment={
                <InputAdornment position="end" style={{ marginLeft: "-10px" }}>
                  <IconButton
                    tabIndex={-1}
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? (
                      <RemoveRedEyeIcon fontSize="small" />
                    ) : (
                      <VisibilityOffIcon fontSize="small" />
                    )}
                  </IconButton>

                  <IconButton
                    tabIndex={-1}
                    onClick={() => setShowKeyboard(!showKeyboard)}
                    onMouseDown={handleMouseDownPassword}
                  >
                    <KeyboardIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              }
              placeholder={"********"}
            />

            {touch && error && (
              <FormHelperText error id={password_input_id}>
                {error}
              </FormHelperText>
            )}
            {isShowStrong && (
              <PasswordStrengthBar
                password={value}
                shortScoreWord=""
                scoreWords={["ضعیف", "ضعیف", "معمولی", "خوب", "قوی"]}
                minLength={PASSWORD_MIN_LENGTH}
              />
            )}
          </Stack>

          {showKeyboard && (
            <Stack spacing={1} className="keyboard-wrapper">
              <Keyboard
                keyboardRef={(t) => setKeyboardRef(t)}
                mergeDisplay={true}
                display={{
                  "{space}": "space",
                }}
                layoutName={layoutName}
                layout={layout}
                onRender={(event) => event?.setInput(value)}
                onChange={(value) => {
                  setValue(name, value);
                }}
                onKeyPress={handleShift}
              />
            </Stack>
          )}
        </Box>
      </ClickAwayListener>
    );
  }
);

export default PasswordInput;
