import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import Textfield from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import FakeFileInput from './components/FakeFileInput';

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2),
    },
    fileInput: {
      display: 'none',
    },
    label: {
      display: 'flex',
      justifyContent: 'space-between',
    },
  })
);

export default () => {
  const classes = useStyle();

  const handleFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    const base64Files = await readMultiFiles(files);

    console.log(base64Files);
  };

  return (
    <Paper square className={classes.root}>
      <form>
        <FormControl fullWidth margin="normal">
          <Textfield id="project-title" label="Project title" />
        </FormControl>
        <Typography variant="h6">3D object data</Typography>
        <FormControl margin="normal">
          <Textfield id="title" label="Product title" />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <input
            accept=".obj,.fbx"
            className={classes.fileInput}
            id="model-file"
            type="file"
            onChange={handleFile}
          />
          <label htmlFor="model-file" className={classes.label}>
            <FakeFileInput placeholder="Upload 3D model" />
            <Button variant="contained" color="primary" component="span">
              Upload
            </Button>
          </label>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <input
            accept="image/*"
            className={classes.fileInput}
            id="diffuse-file"
            multiple
            type="file"
            onChange={handleFile}
          />
          <label htmlFor="diffuse-file" className={classes.label}>
            <FakeFileInput placeholder="Upload diffuse map" />
            <Button variant="contained" color="primary" component="span">
              Upload
            </Button>
          </label>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <input
            accept="image/*"
            className={classes.fileInput}
            id="normal-file"
            multiple
            type="file"
            onChange={handleFile}
          />
          <label htmlFor="normal-file" className={classes.label}>
            <FakeFileInput placeholder="Upload normal map" />
            <Button variant="contained" color="primary" component="span">
              Upload
            </Button>
          </label>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <input
            accept="image/*"
            className={classes.fileInput}
            id="specular-file"
            multiple
            type="file"
            onChange={handleFile}
          />
          <label htmlFor="specular-file" className={classes.label}>
            <FakeFileInput placeholder="Upload specular map" />
            <Button variant="contained" color="primary" component="span">
              Upload
            </Button>
          </label>
        </FormControl>

        <Typography variant="h6">3D object material thumbnails</Typography>
        <FormControl fullWidth margin="normal">
          <input
            accept="image/*"
            className={classes.fileInput}
            id="material-items"
            multiple
            type="file"
            onChange={handleFile}
          />
          <label htmlFor="material-items" className={classes.label}>
            <FakeFileInput placeholder={'Upload material thumbnails'} />
            <Button variant="contained" color="primary" component="span">
              Upload
            </Button>
          </label>
        </FormControl>
      </form>
    </Paper>
  );
};

function readMultiFiles(files: FileList): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    const fileArr: any[] = [];

    const readFile = (index: number) => {
      if (index === files.length) {
        resolve(fileArr);
      } else {
        const file = files[index];
        reader.onload = (e) => {
          const bin = e.target.result;

          fileArr.push(bin);
          readFile(index + 1);
        };

        reader.readAsDataURL((file as unknown) as Blob);
      }
    };

    readFile(0);
  });
}
