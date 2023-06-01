import { Image, StyleSheet, TextInput } from "react-native";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Box from "../components/Box";
import Button from "../components/Button";
import StyledTextInput from "../components/StyledTextInput";
import Logo from "../components/Logo";
import MaskedViewCustom from "../components/MaskedViewCustom";
import Text from "../components/Text";
import LinearGradient from "../components/LinearGradient";
import Layout from "../components/Layout";
type Props = {};

const Login = (props: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: null,
    password: null,
  });
  const handleSubmit = () => {
    if (errors.email && errors.password)
      setErrors({ email: null, password: null });
    else
      setErrors({
        email: "Please enter an email.",
        password: "Please enter a password.",
      });
  };
  return (
    <Layout variant="main">
      <Box
        width={{ phone: "100%", longPhone: "80%", tablet: "70%" }}
        flexGrow={0}
        padding="xl"
        gap="l"
        flexDirection="column"
        justifyContent={{
          phone: "center",
          longPhone: "center",
          tablet: "center",
        }}
        alignItems="center"
        shadowColor="black"
        shadowRadius={10}
        shadowOpacity={0.15}
      >
        <Box
          width="100%"
          height={{ phone: 60, longPhone: 80, tablet: 100 }}
          overflow="hidden"
          flexDirection="row"
          backgroundColor="white"
          justifyContent="center"
          alignItems="center"
          borderRadius={10}
        >
          <Logo variant="header" />
        </Box>
        <Box
          width="100%"
          flexDirection="column"
          justifyContent="center"
          flexShrink={1}
          gap="l"
          alignItems="center"
        >
          <StyledTextInput
            placeholder="email"
            keyboardType="email-address"
            variant="login"
            message={errors.email}
            value={email}
            onChangeText={setEmail}
          />
          <StyledTextInput
            placeholder="password"
            keyboardType="visible-password"
            variant="login"
            message={errors.password}
            value={password}
            onChangeText={setPassword}
            secure
          />
        </Box>

        <Button label="Login" onPress={handleSubmit} variant="login">
          <MaskedViewCustom
            linearGradientVariant={
              errors.email || errors.password ? "red" : "green"
            }
            noBorder
          >
            <Text variant="subheader">Login</Text>
          </MaskedViewCustom>
        </Button>
      </Box>
    </Layout>
  );
};

export default Login;

const styles = StyleSheet.create({});
