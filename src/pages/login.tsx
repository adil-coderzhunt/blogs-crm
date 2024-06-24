import { AuthPage } from "@refinedev/antd";

export const Login: React.FC = () => {
  return (
    <>
      <AuthPage
        type="login"
        contentProps={{
          className: "auth-page",
        }}
      />
    </>
  );
};
