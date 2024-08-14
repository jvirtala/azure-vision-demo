
import { ComputerVisionClient } from '@azure/cognitiveservices-computervision';
import { ApiKeyCredentials } from '@azure/ms-rest-js';

export class PhotoAnalysis {
    private client: ComputerVisionClient;

    constructor() {
        const key = process.env.AZURE_COMPUTER_VISION_KEY;
        const endpoint = process.env.AZURE_COMPUTER_VISION_ENDPOINT;

        if (!key || !endpoint) {
            throw new Error('Azure Computer Vision credentials are not set in environment variables.');
        }

        this.client = new ComputerVisionClient(
            new ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': key } }),
            endpoint
        );
    }

    async analyze(photoBuffer: Buffer): Promise<any> {
        try {
            const results = await this.client.analyzeImageInStream(photoBuffer, {
                visualFeatures: ['Objects']
            });

            return {
                message: 'Photo analysis completed',
                size: photoBuffer.length,
                objects: results.objects?.map(obj => ({
                    object: obj.object,
                    confidence: obj.confidence
                })) || []
            };
        } catch (error) {
            console.error('Error analyzing photo:', error);
            throw new Error('Failed to analyze photo');
        }
    }
}
