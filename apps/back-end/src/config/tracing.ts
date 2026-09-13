import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { SimpleLogRecordProcessor } from '@opentelemetry/sdk-logs';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-grpc';
import { OTLPLogExporter } from '@opentelemetry/exporter-logs-otlp-grpc';
import Environment from '../helper/constan/environment';

const traceExporter = new OTLPTraceExporter({
  url: Environment.OTEL_EXPORTER_OTLP_ENDPOINT,
});

const logExporter = new OTLPLogExporter({
  url: Environment.OTEL_EXPORTER_OTLP_ENDPOINT,
});

const sdk = new NodeSDK({
  serviceName: Environment.SERVICE_NAME,
  traceExporter,
  logRecordProcessor: new SimpleLogRecordProcessor({ exporter: logExporter }),
  instrumentations: [
    getNodeAutoInstrumentations(),
  ],
});

sdk.start();
