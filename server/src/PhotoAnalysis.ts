import { ComputerVisionClient } from '@azure/cognitiveservices-computervision';
import { ApiKeyCredentials } from '@azure/ms-rest-js';

const createClient = (): ComputerVisionClient => {
    const key = process.env.AZURE_COMPUTER_VISION_KEY;
    const endpoint = process.env.AZURE_COMPUTER_VISION_ENDPOINT;

    if (!key || !endpoint) {
        throw new Error('Azure Computer Vision credentials are not set in environment variables.');
    }

    return new ComputerVisionClient(
        new ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': key } }),
        endpoint
    );
};

export const analyzePhoto = async (photoBuffer: Buffer): Promise<AnalysisResult> => {
    const client = createClient();

    try {
        const results = await client.analyzeImageInStream(photoBuffer, {
            visualFeatures: ['Objects']
        });

        return {
            message: 'Photo analysis completed',
            size: photoBuffer.length,
            objects: results.objects?.filter((obj): obj is AnalysisObject => 
                obj.object !== undefined && obj.confidence !== undefined
            ).map(obj => ({
                object: obj.object,
                confidence: obj.confidence
            })) || []
        };
    } catch (error) {
        console.error('Error analyzing photo:', error);
        throw new Error('Failed to analyze photo');
    }
};

export interface AnalysisObject {
    object: string;
    confidence: number;
}

export interface AnalysisResult {
    message: string;
    size: number;
    objects: Array<AnalysisObject>;
}