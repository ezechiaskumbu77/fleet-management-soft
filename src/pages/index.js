import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import PopUpQuery from "../components/PopUpQuery";
import { CONNECTION_RESPONSABLE } from "../graphql/queries";
import {useAppDispatch} from "../hooks";
import { connexionUser } from "../redux/slice/userSlice";
import {getDate} from "../utils/index";

const Login = () => {
  const [modalON, setModalON] = useState(false);
  const [dataGet, setDataGet] = useState(null);
  const dispatch = useAppDispatch();
  const [toast, setToast] = useState({
    header: "",
    body: "",
    state: false,
    type: "",
    delay: 6000,
  });
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      name: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(20, "la taille maximal est 20")
        .min(3, "la taille minimal est 3")
        .required("Le nom d'utilisateur est requis"),
      password: Yup.string()
        .max(20, "la taille maximal est 20")
        .min(8, "la taille minimal est 8")
        .required("Le Mor de passe est requis"),
    }),
    onSubmit: () => {
      setModalON(true);
      setTimeout(() => {
        allowButton();
      }, 1000);
    },
  });

  const allowButton = () => {
    formik.isSubmitted = false;
  };

  useEffect(() => {
    if (dataGet) {
      const { connectionResponsable } = dataGet;
      dispatch(connexionUser(connectionResponsable));
      localStorage.setItem(
        "user",
        JSON.stringify({ ...connectionResponsable, date: getDate() })
      );
      localStorage.setItem("token", connectionResponsable.token);
      setTimeout(() => {
        router.push("/dashbord");
      }, 2000);
    } else {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user && user.date === getDate()) {
        setToast({
          header: "Felicitation",
          body: `Bienvenue monsieur ${user.name}`,
          type: "success",
          state: true,
        });
        setTimeout(() => {
          dispatch(connexionUser(user));
          router.push("/dashbord");
        }, 3500);
      }
    }
  }, [dataGet, router, dispatch]);

  return (
    <>
      {modalON && (
        <PopUpQuery
          openModal={modalON}
          query={CONNECTION_RESPONSABLE(
            formik.values.name,
            formik.values.password
          )}
          setDataGet={setDataGet}
          setModalON={setModalON}
        />
      )}
      <Head>
        <title>Connexion | Fleet Management Soft</title>
      </Head>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
      >
        <Container maxWidth="sm">
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography color="textPrimary" variant="h3">
                Connexion
              </Typography>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Bienvenue sur la page de connexion connection de{" "}
                <strong>fleet management software</strong>
              </Typography>
            </Box>
            <Box
              sx={{
                pb: 1,
                pt: 3,
              }}
            >
              <Typography align="center" color="textSecondary" variant="body1">
                Connectez - vous avec vos identifiants !
              </Typography>
            </Box>
            <TextField
              error={Boolean(formik.touched.name && formik.errors.name)}
              fullWidth
              helperText={formik.touched.name && formik.errors.name}
              label="Nom d'utilisateur"
              margin="normal"
              name="name"
              onChange={formik.handleChange}
              type="text"
              value={formik.values.name}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Mot de passe"
              margin="normal"
              name="password"
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              variant="outlined"
            />
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitted}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Connexion
              </Button>
            </Box>
            <Typography color="textSecondary" variant="body2">
              Mot de passe oublié ?{" "}
              <NextLink href="/recovery">
                <Link href="/recovery">Cliquez ici</Link>
              </NextLink>
            </Typography>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Login;
