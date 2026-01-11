import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';

let model: cocoSsd.ObjectDetection | null = null;

export const loadModel = async (): Promise<void> => {
  if (!model) {
    console.log('Carregando modelo COCO-SSD...');
    model = await cocoSsd.load();
    console.log('Modelo carregado com sucesso!');
  }
};

export const detectObjects = async (imageElement: HTMLImageElement): Promise<string[]> => {
  if (!model) {
    await loadModel();
  }

  if (!model) {
    throw new Error('Modelo não pôde ser carregado');
  }

  const predictions = await model.detect(imageElement);

  // Extrair apenas os nomes dos objetos detectados com confiança > 50%
  const detectedObjects = predictions
    .filter(pred => pred.score > 0.5)
    .map(pred => pred.class);

  // Remover duplicatas
  return [...new Set(detectedObjects)];
};

export const getObjectsFromImage = async (imageUrl: string): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = async () => {
      try {
        const objects = await detectObjects(img);
        resolve(objects);
      } catch (error) {
        reject(error);
      }
    };

    img.onerror = () => {
      reject(new Error('Falha ao carregar imagem'));
    };

    img.src = imageUrl;
  });
};
